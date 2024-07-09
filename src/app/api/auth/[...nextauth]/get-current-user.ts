import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

import { authOptions } from "./providers";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      signOut({
        callbackUrl: `/`,
      });
    }
  
    return session?.user;
  }