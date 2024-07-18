import React from "react";
import { Container } from "@/components/Container";

export function Footer() {
  return (
    <div className="relative">
      <Container>
        <div className="text-sm text-center text-gray-600 dark:text-gray-400 py-6">
          Copyright © {new Date().getFullYear()}. Made with ♥ by Goutam.
        </div>
      </Container>
    </div>
  );
}



