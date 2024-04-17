export const formRes = (res:string[]) => {
    const natal = {
        sun:{deg:res[0], min:res[1]},
        moon:{deg:res[2], min:res[3]},
        merk:{deg:res[4], min:res[5]},
        ven:{deg:res[6], min:res[7]},
        mar:{deg:res[8], min:res[9]},
        upi:{deg:res[10], min:res[11]},
        sat:{deg:res[12], min:res[13]},
        ura:{deg:res[14], min:res[15]},
        nep:{deg:res[16], min:res[17]},
        plu:{deg:res[18], min:res[19]},
    };
    return natal
}   