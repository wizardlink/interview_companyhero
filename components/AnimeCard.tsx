import {
	Card,
	Divider,
	Popover,
	Typography,
} from "antd";
import Link from "next/link";

import { Anime as KitsuAnime, IKitsuData } from "../handlers/Kitsu";
import "../styles/card.less";

const { Meta } = Card;
const { Text, Title } = Typography;

/**
 * Component for handling individual anime cards.
 * @param {object} props Component's properties
 * @return {JSX.Element}
 */
export function AnimeCard({ anime: { id, attributes }, page }: { anime: IKitsuData, page: string }) : JSX.Element
{
	// Helper class for handling anime metadata.
	const anime = new KitsuAnime({ id, type: "", attributes });

	return (
		<Link href={`/anime/${id}?prevPage=${page}`}>

			{/* Rich tooltip with the title and description of the anime. */}
			<Popover content={ <PopData anime={anime} /> }>
				<Card
					hoverable // Add css animation when hovering
					className="card"
					cover={
						<img className="anime_cover" alt={anime.title} src={attributes.posterImage.original} />
					}
				>
					<CardMeta anime={anime} />
				</Card>
			</Popover>
		</Link>
	);
}

/**
 * Popup tooltip component, used when hovering an anime.
 * @param {object} props Component's properties
 * @return {JSX.Element}
 */
function PopData({ anime }: { anime: KitsuAnime }): JSX.Element
{
	return (
		<div style={{ maxWidth: 400 }}>
			<Title level={5}>
				{ anime.title }
			</Title>

			<Divider style={{ margin: "0 auto", minWidth: "95%", width: "95%" }} />

			<Text type="secondary">
				{ anime.truncatedDescription() }
			</Text>
		</div>
	);
}

/**
 * Create all metadata for the card.
 * @param {object} props Component's properties
 * @return {JSX.Element}
 */
function CardMeta({ anime }: { anime: KitsuAnime }): JSX.Element
{
	let title: string = "";

	// Look for the first valid title.
	for (const aTitle of Object.values(anime.attributes.titles))
	{
		if (aTitle)
		{
			title = aTitle;
			break;
		}
	}

	return (
		<Meta title={title} description={/^\d{4}/.exec(anime.attributes.startDate)} />
	);
}
