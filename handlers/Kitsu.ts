import { APIRouter, buildRouter } from "../structures/Api";

/**
 * Helper class to handle the Kitsu API
 */
export class Kitsu
{
	private readonly basePath: string = "https://kitsu.io/api/edge";
	private readonly api: () => APIRouter;

	public pageSize: number = 12;

	/**
	 * Create a handler.
	 * @param {object} options The options for the request.
	 */
	constructor({ pageSize }: { pageSize?: number } = {})
	{
		// Create the API structure.
		this.api = buildRouter({
			baseURL: this.basePath,
			defaultHeaders: {
				accept: "application/vnd.api+json",
				"content-type": "application/vnd.api+json",
			},
		});

		if (pageSize) this.pageSize = pageSize;
	}

	/**
	 * Search for an anime.
	 * @param {IKitsuFilter} filter Filters for the API request.
	 * @return {Promise<IKitsuResponse>}
	 */
	public async searchAnime(filter?: IKitsuFilter): Promise<IKitsuResponse>
	{
		if (filter)
		{
			// Search with an offset, used for pagination.
			if (filter.pageOffset)
			{
				return this.api().anime.get({
					query: {
						"page[limit]": this.pageSize,
						"page[offset]": filter.pageOffset,
					},
				});
			}

			// Search using filter, used for specific animes.
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

/**
 * Helper class for handling anime metadata.
 */
export class Anime
{
	public readonly attributes: IKitsuAttributes;
	public readonly title: string;
	public readonly id: number;

	/**
	 * Instanciate the helper class.
	 * @param {object} data Data fetched from the API.
	 */
	public constructor({ attributes, id }: IKitsuData)
	{
		this.id = id;
		this.attributes = attributes;

		// Set the first available title.
		this.title = Object.values(attributes.titles).map(title =>
		{
			if (title.length) return title;
		})[0] as string;
	}

	/**
	 * Truncate a large description.
	 * @param {number} size Maximum number of characters.
	 * @return {string} The truncated string.
	 */
	public truncatedDescription(size: number = 200): string
	{
		if (this.attributes.description.length > size) return this.attributes.description.slice(0, size - 3) + "...";
		else return this.attributes.description;
	}
}

/**
 * Interface for filtering anime when searching.
 */
export interface IKitsuFilter
{
	categories?: string;
	text?: string;
	id?: string;
	pageOffset?: string;
}

/**
 * Interface for the attributes of an anime fetched.
 */
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

/**
 * Anime data/metadata from the API.
 */
export interface IKitsuData
{
	id: number;
	"type": string;
	attributes: IKitsuAttributes;
}

/**
 * Kitsu's API response interface.
 */
export interface IKitsuResponse
{
	data: IKitsuData[];
	links: {
		first: string;
		next: string;
		last: string;
	};
}
