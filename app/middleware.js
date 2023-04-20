import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

// const secret = "NO SECRET"

export default function middleware(req) {
    console.log(running)
    const jwt = localStorage.getItem("token")
    console.log(jwt)

    const url = req.url;

    if (url.includes('/home')) {
        if (jwt === undefined) {
            return NextResponse.redirect('/login')
        }

    }
    return NextResponse.next()
}