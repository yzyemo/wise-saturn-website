"use client";
import { useRef, useState } from "react";
import { PlayIcon } from "./Icons";

export default function DemoVideo({className="button button-white",label="Watch demo"}:{className?:string;label?:string}){
  const dialog=useRef<HTMLDialogElement>(null);
  const [playing,setPlaying]=useState(false),close=()=>{setPlaying(false);dialog.current?.close()};
  return <><button className={className} onClick={()=>{setPlaying(true);dialog.current?.showModal()}}><PlayIcon/> {label}</button><dialog className="video-dialog" ref={dialog} onClose={()=>setPlaying(false)} onClick={(event)=>{if(event.target===dialog.current)close()}}><button className="video-dialog-close" onClick={close} aria-label="Close video">Close</button>{playing&&<iframe src="https://www.youtube-nocookie.com/embed/EG-EWgt12po?rel=0&autoplay=1" title="Wise Saturn product demonstration" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/>}</dialog></>
}

