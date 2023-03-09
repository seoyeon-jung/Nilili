import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { SearchModal, SearchModalAddCourseBtn } from "../common";
import { PostCourse } from "./index";
import { MapMarkers } from "../common";
import { useSelector } from "react-redux";
import { useKakaoMap } from "../../hooks";

const PostMap = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchList, setSearchList] = useState<SearchListType[]>([]);
  const [searchCnt, setSearchCnt] = useState<number | undefined>();
  const [map, setMap] = useState();
  const lists = useSelector((state: any) => state.courseSlice.courseList);
  const filteredIdx = useSelector(
    (state: any) => state.courseSlice.filteredIdx
  );

  useKakaoMap(map, searchKeyword, setSearchList, setSearchCnt);

  return (
    <div>
      <div className="hidden xs:block xs:w-full xs:-mt-[18px] xs:-mb-3">
        <SearchModalAddCourseBtn setModalOpen={setModalOpen} />
      </div>
      <div className="w-full flex h-full mb-20 xs:mb-6">
        <Map
          center={{
            lat:
              filteredIdx === "" || filteredIdx === -1
                ? 37.566826
                : lists[filteredIdx]?.position.lat,
            lng:
              filteredIdx === "" || filteredIdx === -1
                ? 126.9786567
                : lists[filteredIdx].position.lng,
          }}
          level={4}
          // @ts-ignore
          onCreate={setMap}
          className="w-[70%] h-[1024px] z-0 xs:w-full xs:h-[600px]"
        >
          <MapMarkers />
        </Map>
        <PostCourse setModalOpen={setModalOpen} />
        {modalOpen && (
          <SearchModal
            setModalOpen={setModalOpen}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            searchList={searchList}
            setSearchList={setSearchList}
            searchCnt={searchCnt}
          />
        )}
      </div>
    </div>
  );
};

export default PostMap;
