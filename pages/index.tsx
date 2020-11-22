import {
	Anchor,
	Layout,
	Typography,
} from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import Link from "next/link";

import "../styles/index.less";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Home(): JSX.Element
{
	return (
		<section id="home">
			<div className="banner"></div>
			<Layout>
				<Content className="home_content">
					<Title className="title">COMPANY HERO</Title>
					<Text className="subtitle">Browse through countless animes at ease.</Text>
					<Anchor className="anchor">
						<Link href="/anime">
							<ArrowDownOutlined className="arrow" />
						</Link>
					</Anchor>
				</Content>
			</Layout>
		</section>
	);
}
