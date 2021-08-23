import Head from 'next/head'
import Image from 'next/image'

import useSWR from 'swr'
import { useRouter } from 'next/router'
import styles from '../../styles/Chat.module.css';
import Loading from '../../public/loading.gif';
export default function Chat() {
	const { chatId } = useRouter().query;
	const fetcher = (url) => fetch(url).then((res) => res.json());
	const { data } = useSWR(`/api/chats/${chatId}`, fetcher);
	const representData = (data) => {
		const render = [];
		for (let i of data) {
			if (i.by == "Human") {
				render.push(
					<div className={styles.hu}>
						<p>{i.text}</p>
					</div>
				)
			} else {
				render.push(
					<div className={styles.ai}>
						<p>{i.text}</p>
					</div>
				)
			}
		}
		return render
	}
	return (
    	<div className={styles.container}>
			<Head>
				<title>AI Log: {chatId}</title>
				<meta name="description" content="..." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<div className={styles.title}><h1>Chat {chatId}</h1></div>
				<div className={styles.chatSeq}>
					{!data && <Image src={Loading} alt="Loading" className={styles.loading} />}
					{data && representData(data)}
				</div>
			</main>
    	</div>
	)
}
