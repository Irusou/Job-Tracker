import { Link } from 'react-router';

export default function Home() {
	return (
		<nav>
			<Link to={'login'}>login</Link>
			<Link to={'signin'}>signin</Link>
			<Link to={'applications'}>applications</Link>
			<Link to={`applications/${'3cb62f30-d1ea-4694-80a8-6aebe4b73d54'}`}>
				application
			</Link>
			<Link to={'dashboard'}>dashboard</Link>
			<Link to={'board'}>board</Link>
		</nav>
	);
}
