"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const [userInfo, setUserInfo] = useState({});
    const { username } = useParams<{ username: string }>();

    const router = useRouter();

    // useEffect(() => {
    //   axios.get('')
    // }, [third])
    

    return <div>page</div>;
};

export default page;
