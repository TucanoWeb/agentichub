import { api } from './client';

export type BlueprintListItem = {
  hash: string;
  name: string;
  description: string | null;
  usageCount: number;
  updatedAt: string;
};

export type BlueprintFile = { path: string; content: string };

export type BlueprintDetail = {
  hash: string;
  userId?: string | null;
  name: string;
  description: string | null;
  instructions: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  files: BlueprintFile[];
};

export type BlueprintUpsertInput = {
  name: string;
  description?: string;
  instructions: string;
  files: BlueprintFile[];
};

export async function listBlueprints(): Promise<BlueprintListItem[]> {
  const res = await api.get<{ items: BlueprintListItem[] }>('/blueprints');
  return res.data.items;
}

export async function getBlueprint(hash: string): Promise<BlueprintDetail> {
  const res = await api.get<{ blueprint: BlueprintDetail }>(`/blueprints/${hash}`);
  return res.data.blueprint;
}

export async function fetchBlueprint(hash: string): Promise<BlueprintDetail> {
  const res = await api.get<{ blueprint: BlueprintDetail }>(`/fetch-blueprint`, { params: { hash } });
  return res.data.blueprint;
}

export async function listMyBlueprints(): Promise<BlueprintListItem[]> {
  const res = await api.get<{ items: BlueprintListItem[] }>('/me/blueprints');
  return res.data.items;
}

export async function createBlueprint(input: BlueprintUpsertInput): Promise<BlueprintDetail> {
  const res = await api.post<{ blueprint: BlueprintDetail }>('/blueprints', input);
  return res.data.blueprint;
}

export async function updateBlueprint(hash: string, input: Partial<BlueprintUpsertInput>): Promise<BlueprintDetail> {
  const res = await api.put<{ blueprint: BlueprintDetail }>(`/blueprints/${hash}`, input);
  return res.data.blueprint;
}

export async function deleteBlueprint(hash: string): Promise<{ ok: true }> {
  const res = await api.delete<{ ok: true }>(`/blueprints/${hash}`);
  return res.data;
}
