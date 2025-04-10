"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, ExternalLink, Code, Layers, Terminal, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  // Mouse position for cursor effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth cursor following
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Parallax effect values
  const y = useMotionValue(0)
  const x = useMotionValue(0)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  // Update custom cursor position
  useEffect(() => {
    if (cursorRef.current && cursorDotRef.current) {
      cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`
      cursorDotRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`
    }
  }, [mousePosition])

  // Floating animation for elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  }

  // Staggered entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 overflow-hidden">
      {/* Custom cursor elements */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full border border-primary pointer-events-none z-50 mix-blend-difference"
        style={{
          left: -15,
          top: -15,
          transition: "transform 0.1s ease-out, width 0.2s, height 0.2s",
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 rounded-full bg-primary pointer-events-none z-50"
        style={{
          left: -1,
          top: -1,
          transition: "transform 0.05s linear",
        }}
      />

      {/* Background animated elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, Math.random() * 0.5 + 0.8, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.header
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <motion.h1
              className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              Umesh Sharma
            </motion.h1>
          </motion.div>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground mt-2 text-lg"
          >
            <motion.span animate={floatingAnimation} className="inline-block">
              Full Stack Web Developer
            </motion.span>{" "}
            &
            <motion.span
              animate={{
                ...floatingAnimation,
                transition: {
                  ...floatingAnimation.transition,
                  delay: 0.5,
                },
              }}
              className="inline-block ml-1"
            >
              Hackintosh Enthusiast
            </motion.span>
          </motion.p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* About Card */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-2 row-span-1"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)",
              transition: { duration: 0.2 },
            }}
          >
            <Card className="p-6 h-full overflow-hidden relative group">
              <motion.div
                className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <h2 className="text-2xl font-semibold mb-2">Hello, I'm Umesh</h2>
              <p className="text-muted-foreground">
                I build exceptional digital experiences with a focus on performance and user experience. Passionate
                about web development, Python, and Hackintosh builds.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <motion.div whileHover={{ y: -3, scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge variant="outline" className="bg-background/80">
                    Python
                  </Badge>
                </motion.div>
                <motion.div whileHover={{ y: -3, scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge variant="outline" className="bg-background/80">
                    JavaScript
                  </Badge>
                </motion.div>
                <motion.div whileHover={{ y: -3, scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge variant="outline" className="bg-background/80">
                    React
                  </Badge>
                </motion.div>
                <motion.div whileHover={{ y: -3, scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge variant="outline" className="bg-background/80">
                    Hackintosh
                  </Badge>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 row-span-1"
            whileHover={{
              scale: 1.03,
              rotate: 1,
              transition: { type: "spring", stiffness: 400 },
            }}
          >
            <Card className="p-0 overflow-hidden h-full aspect-square relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Umesh Sharma"
                  width={400}
                  height={400}
                  className="object-cover h-full w-full"
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-primary/20 opacity-0 z-5"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Card>
          </motion.div>

          {/* Featured Project */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-2 row-span-1"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)",
              transition: { duration: 0.2 },
            }}
          >
            <Card className="p-6 h-full overflow-hidden relative group">
              <motion.div
                className="absolute -left-20 -bottom-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 7,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <div className="flex justify-between items-start mb-4">
                <div>
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Badge className="mb-2">Featured Project</Badge>
                  </motion.div>
                  <motion.h3
                    className="text-xl font-semibold"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    E-Commerce Platform
                  </motion.h3>
                </div>
                <div className="flex gap-2">
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="#" aria-label="View project">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, rotate: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="#" aria-label="View code">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                Built a full-featured e-commerce platform with user authentication, payment processing, and inventory
                management using the MERN stack.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <motion.div whileHover={{ y: -3, scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge variant="outline" className="bg-background/80">
                    MongoDB
                  </Badge>
                </motion.div>
                <motion.div whileHover={{ y: -3, scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge variant="outline" className="bg-background/80">
                    Express
                  </Badge>
                </motion.div>
                <motion.div whileHover={{ y: -3, scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge variant="outline" className="bg-background/80">
                    React
                  </Badge>
                </motion.div>
                <motion.div whileHover={{ y: -3, scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Badge variant="outline" className="bg-background/80">
                    Node.js
                  </Badge>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 row-span-1"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)",
              transition: { duration: 0.2 },
            }}
          >
            <Card className="p-6 h-full overflow-hidden relative group">
              <motion.div
                className="absolute -right-10 -top-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ y: -8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(var(--primary), 0.2)",
                        "0 0 0 10px rgba(var(--primary), 0)",
                        "0 0 0 0 rgba(var(--primary), 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Code className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="text-xs text-center">Frontend</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(var(--primary), 0.2)",
                        "0 0 0 10px rgba(var(--primary), 0)",
                        "0 0 0 0 rgba(var(--primary), 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                  >
                    <Terminal className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="text-xs text-center">Backend</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(var(--primary), 0.2)",
                        "0 0 0 10px rgba(var(--primary), 0)",
                        "0 0 0 0 rgba(var(--primary), 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                  >
                    <Code className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="text-xs text-center">Python</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(var(--primary), 0.2)",
                        "0 0 0 10px rgba(var(--primary), 0)",
                        "0 0 0 0 rgba(var(--primary), 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.9 }}
                  >
                    <Layers className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="text-xs text-center">DevOps</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(var(--primary), 0.2)",
                        "0 0 0 10px rgba(var(--primary), 0)",
                        "0 0 0 0 rgba(var(--primary), 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.2 }}
                  >
                    <Zap className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="text-xs text-center">Performance</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(var(--primary), 0.2)",
                        "0 0 0 10px rgba(var(--primary), 0)",
                        "0 0 0 0 rgba(var(--primary), 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                  >
                    <Sparkles className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="text-xs text-center">Hackintosh</span>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Project 1 */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 row-span-1"
            whileHover={{
              scale: 1.03,
              rotate: -1,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <Card className="p-0 overflow-hidden h-full relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
              >
                <Image
                  src="/images/hackintosh.jpg"
                  alt="Hackintosh Guide"
                  width={300}
                  height={300}
                  className="object-cover h-full w-full"
                />
              </motion.div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 z-20"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-white font-medium">Hackintosh Guide</h3>
                <p className="text-white/80 text-sm">Custom macOS installation</p>
              </motion.div>
            </Card>
          </motion.div>

          {/* Project 2 */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 row-span-1"
            whileHover={{
              scale: 1.03,
              rotate: 1,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <Card className="p-0 overflow-hidden h-full relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
                className="h-full w-full"
              >
                <Image
                  src="/images/python-data.jpg"
                  alt="Python Data Visualizer"
                  width={300}
                  height={300}
                  className="object-cover h-full w-full"
                  priority
                />
              </motion.div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 z-20"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-white font-medium">Python Data Visualizer</h3>
                <p className="text-white/80 text-sm">Interactive data analysis tool</p>
              </motion.div>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-3 row-span-1"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)",
              transition: { duration: 0.2 },
            }}
          >
            <Card className="p-6 h-full overflow-hidden relative group">
              <motion.div
                className="absolute right-1/4 -bottom-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
              <div className="flex flex-wrap gap-3">
                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button variant="outline" size="sm" className="gap-2 group" asChild>
                    <Link href="https://github.com/21h2" target="_blank" rel="noopener noreferrer">
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
                      >
                        <Github className="h-4 w-4 group-hover:text-primary transition-colors" />
                      </motion.span>
                      <span>GitHub</span>
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button variant="outline" size="sm" className="gap-2 group" asChild>
                    <Link href="https://www.linkedin.com/in/umesh-kumar-sharma-415002338/" target="_blank" rel="noopener noreferrer">
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5, delay: 1 }}
                      >
                        <Linkedin className="h-4 w-4 group-hover:text-primary transition-colors" />
                      </motion.span>
                      <span>LinkedIn</span>
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button variant="outline" size="sm" className="gap-2 group" asChild>
                    <Link href="mailto:correct-ruby4b@icloud.com">
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5, delay: 1.5 }}
                      >
                        <Mail className="h-4 w-4 group-hover:text-primary transition-colors" />
                      </motion.span>
                      <span>Email</span>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.footer
          className="mt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.p animate={floatingAnimation}>
            © {new Date().getFullYear()} Umesh Sharma. All rights reserved.
          </motion.p>
        </motion.footer>
      </motion.div>
    </main>
  )
}

