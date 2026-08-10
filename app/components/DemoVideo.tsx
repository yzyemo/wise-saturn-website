"use client";
import { useRef } from "react";
import { PlayIcon } from "./Icons";

export default function DemoVideo({className="button button-white",label="Watch demo"}:{className?:string;label?:string}){
  const dialog=useRef<HTMLDialogElement>(null);
  return <><button className={className} onClick={()=>dialog.current?.showModal()}><PlayIcon/> {label}</button><dialog className="video-dialog" ref={dialog} onClick={(event)=>{if(event.target===dialog.current)dialog.current.close()}}><button className="video-dialog-close" onClick={()=>dialog.current?.close()} aria-label="Close video">Close</button><iframe src="https://www.youtube-nocookie.com/embed/2WqtQojcaEk?rel=0&autoplay=1" title="Wise Saturn product demonstration" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/></dialog></>
}

