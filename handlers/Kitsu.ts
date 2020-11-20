import { APIRouter, buildRouter } from "../structures/Api";

export class Kitsu
{
	private readonly basePath: string = "https://kitsu.io/api/edge";
	private readonly api: () => APIRouter;

	constructor()
	{
		this.api = buildRouter({
			baseURL: this.basePath,
			defaultHeaders: {
				accept: "application/vnd.api+json",
				"content-type": "application/vnd.api+json",
			},
		});
	}

	public async searchAnime(filter?: IKitsuFilter): Promise<IKitsuResponse[]>
	{
		return this.api().anime.get();
	}
}

export interface IKitsuFilter
{
	categories?: string;
	text?: string;
}

export interface IKitsuResponse
{
	data: {
		id: number;
		"type": string;
		attributes: {
			abbreviatedTitles: string[];
			ageRating: string;
			ageRatingGuide: string;
			averageRating: string;
			canonicalTitle: string;
			coverImage: { // Each one is a link directly to the file.
				large?: string;
				medium?: string;
				original: string;
				small?: string;
				tiny?: string;
			};
			coverImageTopOffset: number;
			createdAt: number;
			description: string;
			endDate: string;
			episodeCount: number;
			episodeLength: number;
			favoritesCount: number;
			nextRelease?: string;
			nsfw: boolean;
			popularityRank: number;
			posterImage: { // Each one is a link directly to the file.
				large?: string;
				medium?: string;
				original: string;
				small?: string;
				tiny?: string;
			};
			ratingRank: string;
			showType: string;
			slug: string;
			startDate: string;
			"status": string;
			subtype: string;
			synopsis: string;
			tba?: string;
			titles: {
				en: string;
				en_jp: string;
				ja_jp: string;
			};
			totalLength: string;
			updatedAt: string;
			userCount: string;
			youtubeVideoId: string;
		};
	};
	links: {
		first: string;
		next: string;
		last: string;
	};
}
