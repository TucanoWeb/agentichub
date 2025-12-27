"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRecentRepos = listRecentRepos;
exports.listMostFavoritedRepos = listMostFavoritedRepos;
exports.searchRepos = searchRepos;
exports.createRepo = createRepo;
exports.getRepoById = getRepoById;
exports.githubToRawUrl = githubToRawUrl;
exports.getUserFavorites = getUserFavorites;
exports.addToFavorites = addToFavorites;
exports.removeFromFavorites = removeFromFavorites;
exports.checkIsFavorite = checkIsFavorite;
const sequelize_1 = require("sequelize");
const GitHubRepo_1 = require("../../db/models/GitHubRepo");
const Favorite_1 = require("../../db/models/Favorite");
const sequelize_2 = require("../../db/sequelize");
async function listRecentRepos(limit = 10) {
    return GitHubRepo_1.GitHubRepo.findAll({
        order: [['created_at', 'DESC']],
        limit,
        raw: true
    });
}
async function listMostFavoritedRepos(limit = 20) {
    try {
        // Consulta SQL raw para obter repos com contagem de favoritos
        const repos = await sequelize_2.sequelize.query(`
      SELECT 
        gr.id,
        gr.github_url,
        gr.tags,
        gr.created_at,
        COALESCE(COUNT(f.id), 0) as favorite_count
      FROM github_repos gr
      LEFT JOIN favorites f ON gr.id = f.repo_id
      GROUP BY gr.id, gr.github_url, gr.tags, gr.created_at
      ORDER BY favorite_count DESC, gr.created_at DESC
      LIMIT :limit
    `, {
            replacements: { limit },
            type: sequelize_1.QueryTypes.SELECT
        });
        return repos;
    }
    catch (error) {
        console.error('Error in listMostFavoritedRepos:', error);
        // Se der erro, retorna lista de repositórios ordenados por data como fallback
        return GitHubRepo_1.GitHubRepo.findAll({
            order: [['created_at', 'DESC']],
            limit,
            raw: true
        });
    }
}
async function searchRepos(query, limit = 50) {
    return GitHubRepo_1.GitHubRepo.findAll({
        where: {
            [sequelize_1.Op.or]: [
                { tags: { [sequelize_1.Op.iLike]: `%${query}%` } },
                { github_url: { [sequelize_1.Op.iLike]: `%${query}%` } }
            ]
        },
        order: [['created_at', 'DESC']],
        limit,
        raw: true
    });
}
async function createRepo(input) {
    // Check if repo already exists
    const existing = await GitHubRepo_1.GitHubRepo.findOne({ where: { github_url: input.github_url } });
    if (existing) {
        const err = new Error('Repository already exists');
        err.code = 'REPO_EXISTS';
        throw err;
    }
    return GitHubRepo_1.GitHubRepo.create({
        github_url: input.github_url,
        tags: input.tags
    });
}
async function getRepoById(id) {
    return GitHubRepo_1.GitHubRepo.findByPk(id, { raw: true });
}
// GitHub URL to raw content URL converter
function githubToRawUrl(githubUrl, filePath = '') {
    // Convert github.com/owner/repo to raw.githubusercontent.com/owner/repo/main
    const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match)
        throw new Error('Invalid GitHub URL');
    const [, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, '');
    return `https://raw.githubusercontent.com/${owner}/${cleanRepo}/main/${filePath}`;
}
async function getUserFavorites(userId) {
    return GitHubRepo_1.GitHubRepo.findAll({
        include: [
            {
                model: Favorite_1.Favorite,
                as: 'favorites',
                where: { user_id: userId },
                attributes: []
            }
        ],
        order: [['created_at', 'DESC']],
        raw: true
    });
}
async function addToFavorites(userId, repoId) {
    return Favorite_1.Favorite.create({
        user_id: userId,
        repo_id: repoId
    });
}
async function removeFromFavorites(userId, repoId) {
    return Favorite_1.Favorite.destroy({
        where: {
            user_id: userId,
            repo_id: repoId
        }
    });
}
async function checkIsFavorite(userId, repoId) {
    const favorite = await Favorite_1.Favorite.findOne({
        where: {
            user_id: userId,
            repo_id: repoId
        }
    });
    return !!favorite;
}
