import {
	Divider,
	Descriptions,
	Row,
	Col,
	Spin,
	Typography,
	Image,
	Layout,
} from "antd";
import { useRouter } from "next/router";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

import { Anime as KitsuAnime, Kitsu, IKitsuResponse } from "../../handlers/Kitsu";
import "antd/dist/antd.less";
import "../../styles/anime.less";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Item } = Descriptions;

export default function Anime(): JSX.Element
{
	const { query: { anime } } = useRouter();

	const [animes, setAnimes] = useState({}) as [IKitsuResponse, Dispatch<SetStateAction<unknown>>];
	const kitsu = new Kitsu();

	useEffect(() =>
	{
		if (!Object.keys(animes).length) kitsu.searchAnime({ id: anime as string }).then(list => setAnimes(list));
	});

	if (Object.keys(animes).length)
	{
		const anime = new KitsuAnime(animes.data[0]);

		return (
			<section id="animes">
				<Layout className="layout">
					<Content className="anime_content">
						<Row style={{ margin: 40 }}>
							<Col span={5}>
								<Image
									src={anime.attributes.posterImage.original}
									className="cover_art"
								/>
							</Col>
							<Col span={18}>
								<Title level={2}>{anime.title}</Title>
								<Text type="secondary">{anime.attributes.description}</Text>
							</Col>
						</Row>
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
						<div style={{ textAlign: "center", marginTop: 15 }}>
							<Title type="secondary" level={4}>Trailer</Title>
							<iframe className="video" src={`https://www.youtube.com/embed/${anime.attributes.youtubeVideoId}`} frameBorder={0}></iframe>
						</div>
					</Content>
				</Layout>
			</section>
		);
	}

	return (<div><Spin size="large" className="loading" /></div>);
}
