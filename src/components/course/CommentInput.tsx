import React, { useEffect, useRef } from "react";
import useCommentPost from "../../hooks/useCommentPost";
import { useAddCommentMutation } from "../../redux/modules/apiSlice";
import { authService } from "../../utils/firebase";
import { CommentProps } from "./CommentDesc";

export interface CommentType {
  createdAt?: number;
  id?: string;
  userId?: string;
  postId?: string;
  nickname?: string | null | undefined;
  comment?: string | undefined;
  profileImage: string | null | undefined;
}

const CommentInput = ({ paramId }: CommentProps) => {
  const { trimValue, changeValueHandler, value, submitHandler } =
    useCommentPost("");
  const submitRef = useRef<HTMLButtonElement | any>();
  const [addComment] = useAddCommentMutation();
  const userImg: any = authService.currentUser?.photoURL;
  useEffect(() => {
    if (trimValue) {
      submitRef.current.disabled = false;
    }
    if (!trimValue || !authService.currentUser) {
      submitRef.current.disabled = true;
    }
  }, [value]);

  const newComment = {
    createdAt: Date.now(),
    userId: authService.currentUser?.uid,
    postId: paramId,
    nickname: authService.currentUser?.displayName,
    comment: trimValue,
    profileImage: authService.currentUser?.photoURL,
  };

  return (
    <>
      <form
        className="mb-28 mt-5 md:mt-0"
        onSubmit={(event) => {
          submitHandler(event, addComment, newComment);
        }}
      >
        <div className="p-3 md:p-5">
          {authService.currentUser ? (
            <div className="flex items-center gap-3 sm:gap-5 mb-5">
              <img
                src={userImg}
                alt="profile Image"
                className="object-fill w-[36px] h-[36px] xs:w-[24px] xs:h-[24px]"
              />
              <h3 className="text-[16px] sm:text-[28px] font-bold">
                {authService.currentUser?.displayName}
              </h3>
            </div>
          ) : null}

          <textarea
            wrap="hard"
            cols={20}
            className="border-2 resize-none px-2 py-1 w-full h-24 sm:h-28 text-[16px] md:text-[22px] focus:outline-black "
            placeholder={
              authService.currentUser
                ? "댓글을 입력해 주세요."
                : "로그인 한 이용자만 이용하실 수 있습니다."
            }
            value={value}
            onChange={(event) => changeValueHandler(event)}
          />
        </div>
        <button
          className="w-20 sm:w-[100px] h-10 sm:h-[60px] bg-[#000000] text-white font-bold px-3 disabled:opacity-40 float-right text-[14px] sm:text-[18px]"
          ref={submitRef}
          disabled
        >
          등록하기
        </button>
      </form>
    </>
  );
};

export default CommentInput;
