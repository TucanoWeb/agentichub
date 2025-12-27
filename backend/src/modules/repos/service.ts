import { Op, QueryTypes } from 'sequelize';
import { GitHubRepo } from '../../db/models/GitHubRepo';
import { Favorite } from '../../db/models/Favorite';
import { sequelize } from '../../db/sequelize';

export async function listRecentRepos(limit = 10) {
  return GitHubRepo.findAll({
    order: [['created_at', 'DESC']],
    limit,
    raw: true
  });
}

export async function listMostFavoritedRepos(limit = 20) {
  try {
    // Consulta SQL raw para obter repos com contagem de favoritos
    const repos = await sequelize.query(`
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
      type: QueryTypes.SELECT
    });
    
    return repos;
  } catch (error) {
    console.error('Error in listMostFavoritedRepos:', error);
    // Se der erro, retorna lista de repositórios ordenados por data como fallback
    return GitHubRepo.findAll({
      order: [['created_at', 'DESC']],
      limit,
      raw: true
    });
  }
}

export async function searchRepos(query: string, limit = 50) {
  return GitHubRepo.findAll({
    where: {
      [Op.or]: [
        { tags: { [Op.iLike]: `%${query}%` } },
        { github_url: { [Op.iLike]: `%${query}%` } }
      ]
    },
    order: [['created_at', 'DESC']],
    limit,
    raw: true
  });
}

export async function createRepo(input: { github_url: string; tags: string }) {
  // Check if repo already exists
  const existing = await GitHubRepo.findOne({ where: { github_url: input.github_url } });
  if (existing) {
    const err = new Error('Repository already exists');
    (err as any).code = 'REPO_EXISTS';
    throw err;
  }

  return GitHubRepo.create({
    github_url: input.github_url,
    tags: input.tags
  } as any);
}

export async function getRepoById(id: string) {
  return GitHubRepo.findByPk(id, { raw: true });
}

// GitHub URL to raw content URL converter
export function githubToRawUrl(githubUrl: string, filePath = ''): string {
  // Convert github.com/owner/repo to raw.githubusercontent.com/owner/repo/main
  const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) throw new Error('Invalid GitHub URL');
  
  const [, owner, repo] = match;
  const cleanRepo = repo.replace(/\.git$/, '');
  
  return `https://raw.githubusercontent.com/${owner}/${cleanRepo}/main/${filePath}`;
}

export async function getUserFavorites(userId: string) {
  return GitHubRepo.findAll({
    include: [
      {
        model: Favorite,
        as: 'favorites',
        where: { user_id: userId },
        attributes: []
      }
    ],
    order: [['created_at', 'DESC']],
    raw: true
  });
}

export async function addToFavorites(userId: string, repoId: string) {
  return Favorite.create({
    user_id: userId,
    repo_id: repoId
  } as any);
}

export async function removeFromFavorites(userId: string, repoId: string) {
  return Favorite.destroy({
    where: {
      user_id: userId,
      repo_id: repoId
    }
  });
}

export async function checkIsFavorite(userId: string, repoId: string): Promise<boolean> {
  const favorite = await Favorite.findOne({
    where: {
      user_id: userId,
      repo_id: repoId
    }
  });
  return !!favorite;
}