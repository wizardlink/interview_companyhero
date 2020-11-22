import { APIRouter, buildRouter } from "../structures/Api";

export class Kitsu
{
	private readonly basePath: string = "https://kitsu.io/api/edge";
	private readonly api: () => APIRouter;

	public pageSize: number = 12;

	constructor({ pageSize }: { pageSize?: number } = {})
	{
		this.api = buildRouter({
			baseURL: this.basePath,
			defaultHeaders: {
				accept: "application/vnd.api+json",
				"content-type": "application/vnd.api+json",
			},
		});

		if (pageSize) this.pageSize = pageSize;
	}

	public async searchAnime(filter?: IKitsuFilter): Promise<IKitsuResponse>
	{
		if (filter)
		{
			if (filter.pageOffset)
			{
				return this.api().anime.get({
					query: {
						"page[limit]": this.pageSize,
						"page[offset]": filter.pageOffset,
					},
				});
			}

			return this.api().anime.get({
				query: {
					"filter[categories]": filter?.categories ?? "",
					"filter[id]": filter?.id ?? "",
					"filter[text]": filter?.text ?? "",
				},
			});
		}

		return this.api().anime.get({ query: { "page[limit]": this.pageSize }});
	}
}

export class Anime
{
	public readonly attributes: IKitsuAttributes;
	public readonly title: string;
	public readonly id: number;

	public constructor({ attributes, id }: IKitsuData)
	{
		this.id = id;
		this.attributes = attributes;

		this.title = Object.values(attributes.titles).map(title =>
		{
			if (title.length) return title;
		})[0] as string;
	}

	public truncatedDescription(size: number = 200): string
	{
		if (this.attributes.description.length > size) return this.attributes.description.slice(0, size -3) + "...";
		else return this.attributes.description;
	}
}

export interface IKitsuFilter
{
	categories?: string;
	text?: string;
	id?: string;
	pageOffset?: string;
}

export interface IKitsuAttributes
{
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
}

export interface IKitsuData
{
	id: number;
	"type": string;
	attributes: IKitsuAttributes;
}

export interface IKitsuResponse
{
	data: IKitsuData[];
	links: {
		first: string;
		next: string;
		last: string;
	};
}
