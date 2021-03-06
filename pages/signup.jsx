import Link from "next/link";
import { useState } from "react";
import Router from 'next/router';
import styles from '../styles/Home.module.css';
import { xhr } from "../helpers/xhr";

export default function Signup() {

	const [warn, setWarn] = useState(null);
	const [loader, setLoader] = useState(false);

	const query = () => {
		setLoader(true);
		xhr('/auth', {query: 'signup',
			email: document.getElementById('email').value,
			password: document.getElementById('password').value
		}, 'POST').then(res => {
			setLoader(false);
			if(res.message === 'ok') Router.push('/gantt/new');
			else setWarn(res.message);
		});
	}

	return (
		<div className={styles.container} onClick={() => setWarn(null)}>
			<div className={styles.form}>
				<div className={styles.formTitle}>Регистрация</div>
				{loader ? <img src="/img/loader.gif" alt="loader" />
				: <>
					<label>
						<span>Электронная почта</span>
						<input className="input" id="email" type="email"/>
					</label>
					<label>
						<span>Пароль</span>
						<input className="input" id="password" type="password"/>
					</label>
					{warn && <div>{warn}</div>}
					<button onClick={query}>
						Зарегестрироваться
					</button>
					<Link href="/login">
						<a>Вход</a>
					</Link>
				</>}
			</div>
		</div>
	)
}
