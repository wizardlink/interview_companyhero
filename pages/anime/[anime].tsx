import {
	Col,
	Button,
	Descriptions,
	Divider,
	Image,
	Layout,
	Row,
	Spin,
	Typography,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Anime as KitsuAnime, Kitsu, IKitsuResponse } from "../../handlers/Kitsu";
import "../../styles/anime.less";

const { Content, Header } = Layout;
const { Title, Text } = Typography;
const { Item } = Descriptions;

export default function Anime(): JSX.Element
{
	/* Get the anime that the user opened */
	const { query: { anime: animeQuery, prevPage } } = useRouter();

	const [animeState, setAnime] = useState({}) as [IKitsuResponse, Dispatch<SetStateAction<unknown>>];

	// Use the handler for the Kitsu API.
	const kitsu = new Kitsu();

	useEffect(() =>
	{
		// Check if it has been fetched already.
		if (!Object.keys(animeState).length) kitsu.searchAnime({ id: animeQuery as string }).then(list => setAnime(list));
	});

	// Render all animes if fetched.
	if (Object.keys(animeState).length)
	{
		// Get the anime fetched
		const anime = new KitsuAnime(animeState.data[0]);

		return (
			<section id="animes">
				<Layout className="layout">
					<Header style={{ position: "fixed", right: "93%", bottom: "93%", background: "transparent" }}>
						<Link href={`/anime?page=${prevPage}`}>
							<Button shape="circle" icon={<ArrowLeftOutlined />} />
						</Link>
					</Header>

					<Content className="anime_content">

						{/* "Header" of the anime */}
						<Row style={{ margin: 40 }}>
							{ /* Cover art for the anime */}
							<Col span={5}>
								<Image
									src={anime.attributes.posterImage.original}
									className="cover_art"
								/>
							</Col>

							{ /* Title and description of the anime */ }
							<Col span={18}>
								<Title level={2}>{anime.title}</Title>
								<Text type="secondary">{anime.attributes.description}</Text>
							</Col>
						</Row>

						{ /* Grid with *metadata* of the anime */ }
						<Row>
							<Descriptions bordered style={{ margin: "0 auto 2em auto" }}>
								<Item label="Start date">{anime.attributes.startDate}</Item>
								<Item label="End date">{anime.attributes.endDate}</Item>
								<Item label="Age rating">{anime.attributes.ageRating}</Item>
								<Item label="Episode count">{anime.attributes.episodeCount}</Item>
								<Item label="Episode length">{anime.attributes.episodeLength}m</Item>
								<Item label="Total length">{anime.attributes.totalLength}m</Item>
							</Descriptions>
						</Row>

						<Divider style={{ margin: "0 auto", minWidth: "95%", width: "95%" }} />

						{/* Anime's trailer */}
						<div style={{ textAlign: "center", marginTop: 15 }}>
							<Title type="secondary" level={4}>Trailer</Title>
							<iframe className="video" src={`https://www.youtube.com/embed/${anime.attributes.youtubeVideoId}`} frameBorder={0}></iframe>
						</div>
					</Content>
				</Layout>
			</section>
		);
	}

	// Returned when loading.
	return (<div><Spin size="large" className="loading" /></div>);
}
