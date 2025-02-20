"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

const Loading = () => {
    // Configuração de variantes para reutilização de animações
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <section
            className="bg-[#fafafa] flex flex-col justify-center items-center h-screen"
            role="status"
            aria-label="Carregando conteúdo"
        >
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col items-center max-w-md px-4 text-center"
            >
                {/* Logo com animação flutuante */}
                <motion.div
                    variants={itemVariants}
                    className="mb-8"
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Image
                        src="/vertcolorido.png"
                        alt="AGRAS"
                        height={250}
                        width={250}
                        priority
                        className="w-full h-auto max-w-[200px] md:max-w-[250px]"
                    />
                </motion.div>

                {/* Spinner com rotação suave */}
                <motion.div
                    variants={itemVariants}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="mb-5"
                    aria-hidden="true"
                >
                    <LoaderCircle className="text-[#8ABF17] w-12 h-12" />
                </motion.div>

                {/* Texto com animação de pulsação */}
                <motion.p
                    variants={itemVariants}
                    className="font-medium text-gray-600 text-lg md:text-xl"
                    animate={{
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                    }}
                >
                    Estamos preparando tudo para você
                    <span className="dot-pulse ml-1">
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse delay-100">.</span>
                        <span className="animate-pulse delay-200">.</span>
                    </span>
                </motion.p>
            </motion.div>
        </section>
    );
};

export default Loading;
