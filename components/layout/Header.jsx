import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import {
  HomeIcon,
  MagicWandIcon,
  Pencil1Icon,
  TwitterLogoIcon,
  MagnifyingGlassIcon,
  CodeIcon,
  BackpackIcon,
  DiscordLogoIcon,
  HamburgerMenuIcon,
  Cross1Icon
} from "@radix-ui/react-icons"
import ConnectWalletButton from "@/components/button/ConnectWalletButton"
import { motion, AnimatePresence } from "framer-motion"

const navVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
    display: "flex"
  },
  closed: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.3 },
    transitionEnd: { display: "none" }
  }
}

const Header = () => {
  const router = useRouter()
  const navRef = useRef()
  const navIconRef = useRef()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [isAnimating, setIsAnimating] = useState(false)

  const toggleMenu = () => {
    if (!isAnimating) {
      setIsMenuOpen(!isMenuOpen)
    }
  }

  const handleAnimationStart = () => {
    setIsAnimating(true)
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  const isActive = (pathname) => router.pathname === pathname

  const buttonClass = (pathname) =>
    `flex flex-row gap-2 items-center justify-center p-3 hover:text-[#ddaa41] ${
      isActive(pathname)
        ? "bg-[#31271a] text-[#e3bb5f] rounded-md"
        : "text-black"
    }`

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        navIconRef.current &&
        !navIconRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [navRef, navIconRef])

  console.log(isMenuOpen)

  return (
    <div className="flex h-16 items-center sm:px-8 px-2 justify-between sm:space-x-0 overflow-hidden">
      <div
        title="logo"
        className="flex flex-row justify-between gap-8 items-center text-base font-medium text-muted-foreground"
      >
        <Link
          href="/"
          className="flex flex-row sm:gap-2 items-center justify-center"
        >
          {/* <Image src="/ratswaplogo.png" alt="Logo" width={64} height={64} /> */}
          <h1>LOGO</h1>
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#e3bb5f] to-[#ddaa41]">
            Insc.wdf
          </div>
        </Link>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="sm:hidden flex flex-1  items-center justify-end ">
        <button
          className="text-[#e3bb5f] hover:text-[#ddaa41] p-4"
          size="icon"
          onClick={() =>
            window.open("https://twitter.com/ratswaporg", "_blank")
          }
        >
          <TwitterLogoIcon className="h-6 w-6" />
        </button>
        <button ref={navIconRef} onClick={toggleMenu}>
          {isMenuOpen ? (
            <Cross1Icon className="h-8 w-8 text-white" />
          ) : (
            <HamburgerMenuIcon className="h-8 w-8 text-white" />
          )}
        </button>
      </div>
      {/* Nav Menu */}
      <AnimatePresence initial={false} onExitComplete={handleAnimationComplete}>
        {isMenuOpen && (
          <motion.div
            ref={navRef}
            title="nav"
            initial="closed"
            animate="open"
            exit="closed"
            variants={navVariants}
            onAnimationStart={handleAnimationStart}
            onAnimationComplete={handleAnimationComplete}
            className="flex-col gap-x-20 absolute sm:relative top-16 left-0 right-0 z-50 rounded-lg mx-2"
          >
            {/* Navigation Links */}

            <div className="flex flex-col gap-2">
              <Link href="/" className={`${buttonClass("/")} bg-[#31271a]`}>
                <div>HOME</div>
              </Link>

              <Link
                href="/swap"
                className={`${buttonClass("/swap")} bg-[#31271a]`}
              >
                <div>SWAP</div>
              </Link>

              <Link
                href="https://unisat.io/market/brc20?tick=rats"
                className={`${buttonClass("/RATS-UNISAT")} bg-[#31271a]`}
              >
                <div>$RATS-UNISAT</div>
              </Link>

              <Link
                href="https://www.okx.com/web3"
                className={`${buttonClass("/RATS-OKX")} bg-[#31271a]`}
              >
                <div>$RATS-OKX</div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div title="nav" className="  gap-x-10 hidden sm:flex sm:flex-row">
        <Link href="/" className={buttonClass("/")}>
          <button className="flex flex-row gap-1">
            <HomeIcon className="h-6 w-6" />
            <div>Home</div>
          </button>
        </Link>

        <Link href="/" className={buttonClass("/inscribe")}>
          <button disabled className="flex flex-row gap-1">
            <Pencil1Icon className="h-6 w-6" />
            <div>Inscribe</div>
          </button>
        </Link>

        <Link href="/" className={buttonClass("/market")}>
          <button disabled className="flex flex-row gap-2">
            <BackpackIcon className="h-6 w-6" />
            <div>MarketPlace</div>
          </button>
        </Link>
      </div>
      <div
        title="social"
        className=" flex-row justify-end items-center space-x-4 text-muted-foreground hidden sm:flex"
      >
        <button
          className="btn bg-white hover:bg-[#31271a] text-[#e3bb5f] hover:text-[#ddaa41]"
          size="icon"
          onClick={() =>
            window.open("https://twitter.com/ratswaporg", "_blank")
          }
        >
          <TwitterLogoIcon className="h-6 w-6" />
        </button>
        <button
          className="btn bg-white hover:bg-[#31271a] text-[#e3bb5f] hover:text-[#ddaa41] hidden sm:flex"
          size="icon"
          // onClick={() => window.open("https://discord.gg", "_blank")}
        >
          <DiscordLogoIcon className="h-6 w-6" />
        </button>
        <div className=" hidden sm:flex">
          <ConnectWalletButton />
        </div>
      </div>
    </div>
  )
}

export default Header
