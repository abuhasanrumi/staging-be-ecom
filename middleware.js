import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

// const secret = "NO SECRET"

export default function middleware(req) {
    // const jwt = localStorage.getItem("token")
    // console.log(jwt)

    // const url = req.url;

    // if (url.includes('/home')) {
    //     if (jwt === undefined) {
    //         return NextResponse.redirect(new URL('/login'), req.url)
    //     }

    // }
    return NextResponse.next()
}