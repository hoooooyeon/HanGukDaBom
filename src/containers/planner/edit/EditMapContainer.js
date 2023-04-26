import { useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditMap from '../../../components/planner/edit/EditMap';
import { createMapAction, toggleMemberModalAction, togglePlannerInfoModalAction, updatePlanAction, updatePlannerAction } from '../../../modules/plannerModule';
import spotImg from '../../../lib/images/spot.png';

const EditMapContainer = () => {
    const dispatch = useDispatch();
    const { planner, plannerError, spots } = useSelector(({ plannerReducer }) => ({
        planner: plannerReducer.planner,
        plannerError: plannerReducer.plannerError,
        spots: plannerReducer.spots,
        // map: plannerReducer.map,
    }));

    const { plannerId, plans, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = { ...planner };
    const onUpdatePlanner = () => {
        dispatch(updatePlannerAction({ plannerId, title, planDateStart, planDateEnd, expense, memberCount, memberTypeId }));
    };

    const onToggleMemberModal = () => {
        dispatch(toggleMemberModalAction());
    };
    const onTogglePlannerInfoModal = () => {
        dispatch(togglePlannerInfoModalAction());
    };

    const mapRef = useRef(null);
    const [map, setMap] = useState();
    const { kakao } = window;
    // 지도 생성
    useEffect(() => {
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 10,
        };
        const map = new kakao.maps.Map(mapRef.current, options);
        setMap(map);
        // dispatch(createMapAction(map));
    }, []);

    useEffect(() => {
        if (map && plans) {
            let bounds = new kakao.maps.LatLngBounds();
            for (let i = 0; i < plans.length; i++) {
                const { planLocations } = plans[i];
                for (let j = 0; j < planLocations.length; j++) {
                    const { locationMapx, locationMapy } = planLocations[j];

                    // LatLngBounds 객체에 좌표를 추가합니다
                    bounds.extend(new kakao.maps.LatLng(locationMapy, locationMapx));
                }
            }
            if (Object.keys(bounds).length !== 0) {
                // 지도에 루트에 포함된 마커들이 보이도록 범위 재설정
                map.setBounds(bounds);
            }
        }
    }, [map]);

    // 지도에 여행지 마커로 표시 + 인포윈도우 표시
    const showSpotMarker = useCallback(() => {
        if (map) {
            let infowindow = new kakao.maps.InfoWindow({ removable: true });
            let marker;
            let markerPosition;
            let imageSize;
            let markerImage;
            for (let i = 0; i < spots.length; i++) {
                const { title, mapx, mapy } = spots[i];

                // 마커가 표시될 위치입니다
                markerPosition = new kakao.maps.LatLng(mapy, mapx);

                // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                imageSize = new kakao.maps.Size(10, 10);
                markerImage = new kakao.maps.MarkerImage(spotImg, imageSize);

                // 마커를 생성합니다
                marker = new kakao.maps.Marker({
                    position: markerPosition,
                    clickable: true,
                    image: markerImage,
                    zIndex: 1,
                });

                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map);

                // 마커에 인포윈도우 생성 및 켜기 이벤트 등록
                kakao.maps.event.addListener(marker, 'click', addInfowindow(marker, title));

                // 맵에 인포윈도우 끄기 이벤트 등록
                kakao.maps.event.addListener(map, 'click', removeInfowindow());
            }

            // 인포윈도우 생성 함수
            function addInfowindow(marker, title) {
                return () => {
                    infowindow.setContent(`<div style="padding:5px;">${title}</div>`);
                    infowindow.open(map, marker);
                };
            }
            function removeInfowindow() {
                return () => {
                    infowindow.close();
                };
            }
        }
    }, [kakao.maps.InfoWindow, kakao.maps.LatLng, kakao.maps.Marker, kakao.maps.event, kakao.maps.Size, kakao.maps.MarkerImage, map, spots]);

    const showRouteMarker = useCallback(() => {
        if (map && plans) {
            let linePath = [];
            let markerPosition;
            let imageSize;
            let marker;
            let polyline;
            for (let i = 0; i < plans.length; i++) {
                const { planLocations } = plans[i];
                for (let j = 0; j < planLocations.length; j++) {
                    const { locationName, locationMapx, locationMapy } = planLocations[j];

                    // 마커가 표시될 위치입니다
                    markerPosition = new kakao.maps.LatLng(locationMapy, locationMapx);
                    imageSize = new kakao.maps.Size(10, 10);

                    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                    let markerImage = new kakao.maps.MarkerImage(spotImg, imageSize);

                    // 마커를 생성합니다
                    marker = new kakao.maps.Marker({
                        position: markerPosition,
                        clickable: true,
                        // image: markerImage,
                    });
                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);

                    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
                    linePath = [...linePath, new kakao.maps.LatLng(locationMapy, locationMapx)];
                }

                // 지도에 표시할 선을 생성합니다
                polyline = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열 입니다
                    strokeWeight: 5, // 선의 두께 입니다
                    strokeColor: 'red', // 선의 색깔입니다
                    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle: 'solid', // 선의 스타일입니다
                });

                // 지도에 선을 표시합니다
                polyline.setMap(map);
            }
        }
    }, [kakao.maps.LatLng, kakao.maps.Polyline, kakao.maps.Marker, kakao.maps.MarkerImage, kakao.maps.Size, map, plans]);

    useEffect(() => {
        showSpotMarker();
        showRouteMarker();
    }, [showRouteMarker, showSpotMarker]);

    return <EditMap mapRef={mapRef} planner={planner} onUpdatePlanner={onUpdatePlanner} onToggleMemberModal={onToggleMemberModal} onTogglePlannerInfoModal={onTogglePlannerInfoModal} />;
};

export default EditMapContainer;
