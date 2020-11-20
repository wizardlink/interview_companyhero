import {
	Anchor,
	Layout,
	Typography,
} from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import Link from "next/link";

import css from "../styles/index.less";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Home(): JSX.Element
{
	return (
		<section id="home">
			<div className={css.banner}></div>
			<Layout>
				<Content className={css.content}>
					<Title className={css.title}>COMPANY HERO</Title>
					<Text className={css.subtitle}>Browse through countless animes at ease.</Text>
					<Anchor className={css.anchor}>
						<Link href="/anime">
							<ArrowDownOutlined className={css.arrow} />
						</Link>
					</Anchor>
				</Content>
			</Layout>
		</section>
	);
}
