import {
	Col,
	Layout,
	Pagination,
	Row,
	Spin,
} from "antd";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

import { Kitsu, IKitsuResponse} from "../../handlers/Kitsu";
import { AnimeCard } from "../../components/AnimeCard";
import "../../styles/anime.less";

const { Content, Footer } = Layout;

export default function AnimeList(): JSX.Element
{
	/* Get the current page, if there is any set */
	const router = useRouter();
	const { query: { page: queryPage } } = router;
	const curPage = (kitsu: Kitsu, page?: number) =>
	{
		if (page) return (page - 1) * kitsu.pageSize;

		return ((parseInt(queryPage as string) ?? 1) - 1) * kitsu.pageSize;
	};

	const [animes, setAnimes] = useState({}) as [IKitsuResponse, Dispatch<SetStateAction<unknown>>];

	// Use the handler for the Kitsu API.
	const kitsu = new Kitsu();
	kitsu.pageSize = 12;

	useEffect(() =>
	{
		// Check if it has been fetched already.
		if (!Object.keys(animes).length) kitsu.searchAnime({ pageOffset: curPage(kitsu).toString() }).then(list => setAnimes(list));
	});

	// Render all animes if fetched.
	if (Object.keys(animes).length)
	{
		return (
			<section id="animes">
				<Layout className="layout">

					{/* Anime grid */}
					<Content className="anime_content">
						<CardGrid res={animes} page={queryPage as string} />
					</Content>

					{/* Pagination handling */}
					<Footer>
						<Pagination
							onChange={(page) =>
							{
								router.push(`/anime?page=${page}`);
								kitsu.searchAnime({
									pageOffset: curPage(kitsu, page).toString(), // Offset by the current page times the amount of animes per page
								}).then(list => setAnimes(list));
							}}
							defaultCurrent={parseInt(queryPage as string) ?? 1}
							total={10000} // Did not have enough time to create endless pagination
							showSizeChanger={false} // Do not show the page size changer, due to Kitsu limitations plus limited time
						/>
					</Footer>
				</Layout>
			</section>
		);
	}

	// Returned when loading.
	return (<div><Spin size="large" className="loading"/></div>);
}

/**
 * Component for rendering and handling a grid with all the animes fetched from Kitsu.
 * @param {object} props Component's prototypes
 * @return {JSX.Element}
 */
function CardGrid({ res: { data }, page }: { res: IKitsuResponse, page: string }): JSX.Element
{
	const columns: JSX.Element[] = [];

	for (const anime of data)
	{
		columns.push((
			<Col span={4} className="gutter-row" key={anime.id} >
				<AnimeCard anime={anime} page={page} />
			</Col>
		));
	}

	return (
		<Row gutter={[16, 24]} justify="center" style={{ marginTop: 25, marginBottom: 25 }}>
			{
				columns
			}
		</Row>
	);
}
