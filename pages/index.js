import Head from 'next/head'

import Image from 'next/image'
import Router from 'next/router'
import useSWR from 'swr'

import styles from '../styles/Index.module.css'
import Loading from '../public/loading.gif';

export default function Home() {
	const fetcher = (url) => fetch(url).then((res) => res.json());
	const { data } = useSWR('/api/chats', fetcher);
	const linkClick = (data) => {
		Router.push(`/chats/${data.target.innerText}`)
	}
	const modify = (data) => {
		const text = data.split('.')[0];
		return (
			<div onClick={linkClick} className={styles.tabs}>
				<p>{text}</p>
			</div>
		)
	}
	return (
    	<div className={styles.container}>
			<Head>
				<title>AI Showcase</title>
				<meta name="description" content="..." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<h1>AI Chat Showcase</h1>
				<div className={styles.chatList}>
					{!data && <Image src={Loading} alt="Loading..." className={styles.loading} />}
					{data && data.map(modify)}
				</div>
				<div className={styles.end}>

				</div>
			</main>
    	</div>
	)
}

