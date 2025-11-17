import Image from "next/image";
import DarkLogo from "@/images/assets/logos/poly-logo-dark.png";
import PolyLight from "@/images/assets/logos/poly-logo-light.png"

export function Logo() {
  return (
    <div className="relative w-[90%] md:w-full h-[5em] md:h-[7em]">
      <Image
        src={PolyLight}
        fill
        className="dark:hidden"
        alt="PolyERP logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={DarkLogo}
        fill
        className="hidden dark:block"
        alt="PolyERP logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
