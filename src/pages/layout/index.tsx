import React, { useEffect } from 'react';
import Header from '@/components/header';
import { setLanguage } from '@/store/uiSettings/uiSettingsSlice';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './style.scss';
import i18n from 'i18next';

const Layout = () => {
	const { lng } = useParams<{ lng: string }>();
	const dispatch = useDispatch();

	// Handle language updates
	useEffect(() => {
		if (lng != null) {
			dispatch(setLanguage(lng));
			void i18n.changeLanguage(lng);
		}
	}, [lng, dispatch]);

	// Scroll-based theme updater
useEffect(() => {
  const sections = document.querySelectorAll("section[data-theme]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute("data-theme");
          console.log("➡️ Theme detected:", theme);  // add this
          document.body.setAttribute("data-theme", theme!);
          console.log(
            "➡️ Current text color variable:",
            getComputedStyle(document.body).getPropertyValue("--text-color")
          );
        }
      });
    },
    { threshold: 0.3 }
  );
  sections.forEach((sec) => observer.observe(sec));
  return () => observer.disconnect();
}, []);


	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
