import NextDocument, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";

export default class Document extends NextDocument
{
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps>
	{
		const initialProps = await NextDocument.getInitialProps(ctx);
		return { ...initialProps };
	}

	render(): JSX.Element
	{
		return (
			<Html>
				<Head />
				<body style={{ margin: 0 }}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
