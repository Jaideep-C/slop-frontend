import React from "react";
import Image from "next/image";
import { GitamLogo, StudentLifeLogo } from "./assets";
type Prop = {
  style: {
    readonly [key: string]: string;
  };
};
const AuthHeader: React.FC<Prop> = ({ style }) => {
  return (
    <div>
      <div className={style.gitam}>
        <Image
          src={GitamLogo}
          alt="gitam-logo"
          width={GitamLogo.width}
          height={GitamLogo.height}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </div>
      <div className={style.student}>
        <Image
          src={StudentLifeLogo}
          alt="student-life-logo"
          width={StudentLifeLogo.width}
          height={StudentLifeLogo.height}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </div>
    </div>
  );
};

export default AuthHeader;
