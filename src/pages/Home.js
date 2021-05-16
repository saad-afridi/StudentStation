import React from 'react';

import { Container } from '@material-ui/core';

import PageTitle from '../components/PageTitle';
import Info from '../components/Home/Info';

import HomeIcon from '@material-ui/icons/Home';

import changeThemeGif from '../assets/changetheme.gif';

// Shouldn't need any State, just a bunch of cool stuff and intro to app

const HomePage = () => {
	return (
		<Container>
			<PageTitle
				text={'Welcome'}
				icon={<HomeIcon style={{ transform: 'scale(2.0)' }} />}
			/>
			<Info
				img={
					<img
						width="350px"
						src={changeThemeGif}
						alt="Changing Theme Gif"
					/>
				}
				text="Change Themes"
                subtext="Choose to display from one of the two options i.e. Light and Dark."
			/>
		</Container>
	);
};

export default HomePage;
