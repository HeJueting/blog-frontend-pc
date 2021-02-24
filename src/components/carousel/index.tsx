import React, { useEffect, useState, useContext } from "react";
import context from "../../store/context";
import lodash from "../../utils/lodash";
import style from "./style.module.scss";
import CONFIG from "../../config";

const Carousel: React.FC = () => {
	// store
	const { state } = useContext(context);
	const { settingInfo } = state;
	// 轮播下标
	const [carouselIndex, setCarouselIndex] = useState(0);

	// 轮播
	const carouselRun = () => {
		if (lodash.get(settingInfo, "carsouelImages")) {
			if (carouselIndex === settingInfo.carsouelImages.length - 1) {
				setCarouselIndex(0);
			} else {
				setCarouselIndex(carouselIndex + 1);
			}
		}
	};
	useEffect(() => {
		const timer = setTimeout(() => {
			carouselRun();
		}, 10000);
		return () => {
			clearTimeout(timer);
		};
	}, [carouselIndex, settingInfo]);

	return (
		<div className={style["carousel-wrap"]}>
			{lodash
				.get(settingInfo, "carsouelImages", [])
				.map((url: string, index: number) => (
					<div
						key={url}
						className={style["image-box"]}
						style={{
							backgroundImage: `url('${CONFIG.IMAGE_REQUEST_PATH}/setting/${url}')`,
							zIndex: index + 1,
							opacity: carouselIndex === index ? 1 : 0,
						}}
					></div>
				))}
		</div>
	);
};

export default Carousel;
