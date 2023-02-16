import React, { useState } from "react";
import { useGetCommentDescQuery } from "../../redux/modules/apiSlice";
import Comment from "./Comment";
import Pagenation from "./Pagenation";

export interface CommentProps {
  paramId: string | undefined;
}

const CommentDesc = ({ paramId }: CommentProps) => {
  const { data, isLoading, isError, error } = useGetCommentDescQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const filterData = data?.filter((comment) => comment.postId === paramId);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = filterData
    ? filterData.slice(firstPostIndex, lastPostIndex)
    : null;
  const totalContents: any = filterData?.length;
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalContents / postsPerPage); i++) {
    pages.push(i);
  }
  if (isError) {
    console.log(error);
  }
  return (
    <div>
      <h2 className="text-xl font-bold">댓글({filterData?.length})</h2>
      {isLoading ? (
        <h3 className="text-xl">댓글을 불러오고 있습니다 :-) </h3>
      ) : null}
      {currentPosts?.map((comment, index) => {
        return <Comment key={comment.id} comment={comment} index={index} />;
      })}
      <Pagenation
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pages={pages}
      />
    </div>
  );
};

export default CommentDesc;
