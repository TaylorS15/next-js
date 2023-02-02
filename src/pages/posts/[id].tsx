import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "lib/posts";
import utilStyles from "../../styles/utils.module.css";

export default function Post({
	postData,
}: {
	postData: { title: string; id: string; date: string; contentHtml: string };
}) {
	return (
		<Layout home={false}>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<h1 className={utilStyles.headingXl}>{postData.title}</h1>
			<div className={utilStyles.lightText}>
				<Date dateString={postData.date} />
			</div>
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
		</Layout>
	);
}

export async function getStaticPaths() {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({
	params: { id },
}: {
	params: { id: string };
}) {
	const postData = await getPostData(id);
	return {
		props: {
			postData,
		},
	};
}
