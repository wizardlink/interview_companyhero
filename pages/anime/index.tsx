import {
	Col,
	Spin,
	Layout,
	Row,
	Pagination,
} from "antd";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

import { Kitsu, IKitsuResponse} from "../../handlers/Kitsu";
import { AnimeCard } from "../../components/AnimeCard";
import "antd/dist/antd.less";
import "../../styles/anime.less";

const { Content, Footer } = Layout;

function createCards(kitsu: Kitsu, { data }: IKitsuResponse): JSX.Element
{
	let rowAmount: number;
	const columns: JSX.Element[] = [];

	for (const anime of data)
	{
		columns.push((
			<Col span={4} className="gutter-row" key={anime.id} >
				<AnimeCard id={anime.id} type={anime.type} attributes={anime.attributes}  />
			</Col>
		));
	}

	return (
		<Row gutter={[16, 24]} justify="center" style={{ marginTop: 25, marginBottom: 25 }}>
			{
				columns.map(c => c)
			}
		</Row>
	);
}

export default function AnimeList(): JSX.Element
{
	const [animes, setAnimes] = useState({}) as [IKitsuResponse, Dispatch<SetStateAction<unknown>>];
	const kitsu = new Kitsu();
	kitsu.pageSize = 12;

	useEffect(() =>
	{
		if (!Object.keys(animes).length) kitsu.searchAnime().then(list => setAnimes(list));
	});

	if (Object.keys(animes).length)
	{
		return (
			<section id="animes">
				<Layout className="layout">
					<Content className="anime_content">
						{ createCards(kitsu, animes) }
					</Content>
					<Footer>
						<Pagination
							onChange={(page) =>
							{
								kitsu.searchAnime({ pageOffset: page.toString() + kitsu.pageSize }).then(list => setAnimes(list));
								console.log(animes);
							}} total={1000}
						/>
					</Footer>
				</Layout>
			</section>
		);
	}

	return (<div><Spin size="large" className="loading"/></div>);
}
