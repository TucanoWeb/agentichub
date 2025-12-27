"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRepoRoutes = registerRepoRoutes;
const joi_1 = __importDefault(require("joi"));
const validators_1 = require("./validators");
const service_1 = require("./service");
const axios_1 = __importDefault(require("axios"));
async function registerRepoRoutes(server) {
    // Public routes
    server.route({
        method: 'GET',
        path: '/repos/recent',
        options: { auth: false },
        handler: async (_req, h) => {
            const repos = await (0, service_1.listRecentRepos)();
            return h.response({ repos }).code(200);
        }
    });
    server.route({
        method: 'GET',
        path: '/repos/popular',
        options: { auth: false },
        handler: async (_req, h) => {
            const repos = await (0, service_1.listMostFavoritedRepos)();
            return h.response({ repos }).code(200);
        }
    });
    server.route({
        method: 'GET',
        path: '/repos/search',
        options: {
            auth: false,
            validate: {
                query: joi_1.default.object({
                    q: joi_1.default.string().required(),
                    limit: joi_1.default.number().integer().min(1).max(100).default(50)
                })
            }
        },
        handler: async (req, h) => {
            const { q, limit } = req.query;
            const repos = await (0, service_1.searchRepos)(q, limit);
            return h.response({ repos }).code(200);
        }
    });
    server.route({
        method: 'POST',
        path: '/repos',
        options: {
            auth: false,
            validate: { payload: validators_1.createRepoSchema }
        },
        handler: async (req, h) => {
            const payload = req.payload;
            try {
                const repo = await (0, service_1.createRepo)(payload);
                return h.response({ repo: repo.get({ plain: true }) }).code(201);
            }
            catch (err) {
                if (err?.code === 'REPO_EXISTS') {
                    return h.response({ error: 'Repository already exists' }).code(409);
                }
                return h.response({ error: 'Failed to create repository' }).code(400);
            }
        }
    });
    // Agent endpoint - fetches comprehensive repository data for AI agents
    server.route({
        method: 'GET',
        path: '/fetch-blueprint',
        options: {
            auth: false,
            validate: { query: validators_1.fetchRepoQuery }
        },
        handler: async (req, h) => {
            const { id } = req.query;
            try {
                const repo = await (0, service_1.getRepoById)(id);
                if (!repo)
                    return h.response({ error: 'Repository not found' }).code(404);
                // Extract owner and repo name for GitHub API calls
                const match = repo.github_url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
                if (!match) {
                    return h.response({ error: 'Invalid GitHub URL format' }).code(400);
                }
                const [, owner, repoName] = match;
                const cleanRepoName = repoName.replace(/\.git$/, '');
                // Try multiple README variations
                const readmeVariations = [
                    'README.md',
                    'readme.md',
                    'README.MD',
                    'README.rst',
                    'README.txt',
                    'README'
                ];
                let readme = 'README not found';
                let foundReadmeFile = null;
                for (const readmeFile of readmeVariations) {
                    try {
                        const readmeUrl = (0, service_1.githubToRawUrl)(repo.github_url, readmeFile);
                        const response = await axios_1.default.get(readmeUrl);
                        readme = response.data;
                        foundReadmeFile = readmeFile;
                        break;
                    }
                    catch (err) {
                        // Continue to next variation
                    }
                }
                // Try to fetch repository metadata from GitHub API
                let repoMetadata = null;
                let packageJson = null;
                let fileStructure = [];
                try {
                    // Get repo metadata
                    const metadataResponse = await axios_1.default.get(`https://api.github.com/repos/${owner}/${cleanRepoName}`);
                    repoMetadata = {
                        name: metadataResponse.data.name,
                        full_name: metadataResponse.data.full_name,
                        description: metadataResponse.data.description,
                        language: metadataResponse.data.language,
                        languages_url: metadataResponse.data.languages_url,
                        stargazers_count: metadataResponse.data.stargazers_count,
                        forks_count: metadataResponse.data.forks_count,
                        topics: metadataResponse.data.topics || [],
                        license: metadataResponse.data.license?.name || null,
                        created_at: metadataResponse.data.created_at,
                        updated_at: metadataResponse.data.updated_at
                    };
                    // Try to get package.json for tech stack info
                    try {
                        const packageJsonUrl = (0, service_1.githubToRawUrl)(repo.github_url, 'package.json');
                        const packageResponse = await axios_1.default.get(packageJsonUrl);
                        packageJson = JSON.parse(packageResponse.data);
                    }
                    catch (err) {
                        // package.json not found or invalid - not critical
                    }
                    // Get file structure (root directory)
                    try {
                        const contentsResponse = await axios_1.default.get(`https://api.github.com/repos/${owner}/${cleanRepoName}/contents`);
                        fileStructure = contentsResponse.data.map((item) => ({
                            name: item.name,
                            type: item.type,
                            path: item.path,
                            size: item.size,
                            download_url: item.download_url
                        }));
                    }
                    catch (err) {
                        // File structure fetch failed - not critical
                    }
                }
                catch (githubApiErr) {
                    // GitHub API calls failed - continue with basic info
                }
                // Enhanced response for AI agents
                return h.response({
                    // Basic repository info
                    id: repo.id,
                    github_url: repo.github_url,
                    tags: repo.tags,
                    raw_base_url: (0, service_1.githubToRawUrl)(repo.github_url),
                    // Documentation
                    readme: readme,
                    readme_file: foundReadmeFile,
                    // GitHub metadata (if available)
                    metadata: repoMetadata,
                    // Tech stack information
                    package_json: packageJson,
                    // File structure for exploration
                    file_structure: fileStructure,
                    // AI-friendly summary
                    ai_context: {
                        primary_language: repoMetadata?.language || 'Unknown',
                        description: repoMetadata?.description || 'No description available',
                        topics: repoMetadata?.topics || [],
                        has_package_json: packageJson !== null,
                        main_files: fileStructure.filter((f) => ['package.json', 'tsconfig.json', 'webpack.config.js', 'vite.config.ts',
                            'next.config.js', 'tailwind.config.js', 'docker-compose.yml', 'Dockerfile']
                            .some(important => f.name.toLowerCase().includes(important.toLowerCase()))).map((f) => f.name),
                        estimated_stack: packageJson ? [
                            ...(packageJson.dependencies ? Object.keys(packageJson.dependencies) : []),
                            ...(packageJson.devDependencies ? Object.keys(packageJson.devDependencies) : [])
                        ].filter((dep) => ['react', 'vue', 'angular', 'express', 'fastify', 'next', 'nuxt',
                            'typescript', 'javascript', 'tailwind', 'bootstrap'].some(tech => dep.toLowerCase().includes(tech))).slice(0, 10) : [],
                        folder_structure_summary: fileStructure.filter((f) => f.type === 'dir')
                            .map((f) => f.name).slice(0, 10)
                    }
                }).code(200);
            }
            catch (err) {
                return h.response({ error: 'Failed to fetch repository' }).code(500);
            }
        }
    });
    // Protected routes (require auth)
    server.route({
        method: 'GET',
        path: '/favorites',
        options: { auth: 'jwt' },
        handler: async (req, h) => {
            const userId = req.auth.credentials.userId;
            const favorites = await (0, service_1.getUserFavorites)(userId);
            return h.response({ favorites }).code(200);
        }
    });
    server.route({
        method: 'POST',
        path: '/favorites/{id}',
        options: {
            auth: 'jwt',
            validate: {
                params: joi_1.default.object({ id: joi_1.default.string().uuid().required() })
            }
        },
        handler: async (req, h) => {
            const { id: repoId } = req.params;
            const userId = req.auth.credentials.userId;
            try {
                await (0, service_1.addToFavorites)(userId, repoId);
                return h.response({ success: true }).code(201);
            }
            catch (err) {
                if (err?.name === 'SequelizeUniqueConstraintError') {
                    return h.response({ error: 'Already favorited' }).code(409);
                }
                return h.response({ error: 'Failed to add favorite' }).code(400);
            }
        }
    });
    server.route({
        method: 'DELETE',
        path: '/favorites/{id}',
        options: {
            auth: 'jwt',
            validate: {
                params: joi_1.default.object({ id: joi_1.default.string().uuid().required() })
            }
        },
        handler: async (req, h) => {
            const { id: repoId } = req.params;
            const userId = req.auth.credentials.userId;
            const deleted = await (0, service_1.removeFromFavorites)(userId, repoId);
            if (deleted === 0) {
                return h.response({ error: 'Favorite not found' }).code(404);
            }
            return h.response({ success: true }).code(200);
        }
    });
    server.route({
        method: 'GET',
        path: '/favorites/check/{id}',
        options: {
            auth: 'jwt',
            validate: {
                params: joi_1.default.object({ id: joi_1.default.string().uuid().required() })
            }
        },
        handler: async (req, h) => {
            const { id: repoId } = req.params;
            const userId = req.auth.credentials.userId;
            const isFavorite = await (0, service_1.checkIsFavorite)(userId, repoId);
            return h.response({ is_favorite: isFavorite }).code(200);
        }
    });
}
