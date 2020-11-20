import {
	Layout,
} from "antd";
import { useState, useEffect } from "react";

import css from "../../styles/anime.less";
import { Kitsu } from "../../handlers/Kitsu";

const { Content } = Layout;

export default function AnimeList(): JSX.Element
{
	const [animes, setAnimes] = useState({});

	useEffect(() =>
	{
		if (!Object.keys(animes).length) new Kitsu().searchAnime().then(list => setAnimes(list));
	});

	if (Object.keys(animes).length)
	{
		return (
			<section id="home">
				<Layout className={css.layout}>
					<Content className={css.content}>
						<span>{animes.data[0].attributes.slug}</span>
					</Content>
				</Layout>
			</section>
		);
	}

	return (<></>);
}
