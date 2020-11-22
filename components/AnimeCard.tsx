import { Card, Popover, Typography, Divider } from "antd";
import Link from "next/link";

import { Anime as KitsuAnime, IKitsuData, IKitsuAttributes } from "../handlers/Kitsu";
import "../styles/card.less";

const { Meta } = Card;
const { Text, Title } = Typography;

function createMeta(attributes: IKitsuAttributes): JSX.Element
{
	let title: string = "";

	for (const aTitle of Object.values(attributes.titles))
	{
		if (aTitle)
		{
			title = aTitle;
			break;
		}
	}

	return (
		<Meta title={title} description={/^\d{4}/.exec(attributes.startDate)} />
	);
}

function PopData({ attributes }: { attributes: IKitsuAttributes }): JSX.Element
{
	const anime = new KitsuAnime({ id: 0, type: "", attributes });

	return (
		<div style={{ maxWidth: 400 }}>
			<Title level={5}>{anime.title}</Title>
			<Divider style={{ margin: "0 auto", minWidth: "95%", width: "95%" }} />
			<Text type="secondary">
				{anime.truncatedDescription()}
			</Text>
		</div>
	);
}

export function AnimeCard({ id, attributes }: IKitsuData) : JSX.Element
{
	return (
		<Link href={`/anime/${id}`}>
			<Popover content={<PopData attributes={attributes} />}>
				<Card
					hoverable
					className="card"
					cover={
						<img className="anime_cover" alt={attributes.titles.en} src={attributes.posterImage.original} />
					}
				>
					{ createMeta(attributes) }
				</Card>
			</Popover>
		</Link>
	);
}
