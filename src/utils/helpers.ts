import { UsersInfoResponse, WebClient } from "@slack/web-api";
import { Redis } from "ioredis";
export function getUser(
	client: WebClient,
	userId: string
): Promise<UsersInfoResponse> {
	return client.users.info({ user: userId });
}

export async function isAdmin(
	client: WebClient,
	userId: string
): Promise<boolean> {
	const userRes = await getUser(client, userId);
	return userRes.user!.is_admin!;
}

export async function isInQueue(
	redis: Redis,
	queue: string,
	userId: string
): Promise<number> {
	return redis.exists(queue, userId);
}

export async function rank(
	queue: string,
	redis: Redis,
	userId: string
): Promise<number> {
	return redis.zrank(queue, userId) as never as number;
}