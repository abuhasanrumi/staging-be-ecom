import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { useSelector } from "react-redux";

// const secret = "NO SECRET"

function middleware(req) {
    console.log("middlware working")
    // const jwt = useSelector(state => state.auth.token)

    // const url = req.url;

    // if (url.includes('/profile')) {
    //     if (jwt === null || !jwt) {
    //         return NextResponse.redirect(new URL('/login'), req.url)
    //     }

    // }
    // return NextResponse.next()
}

export default middleware;