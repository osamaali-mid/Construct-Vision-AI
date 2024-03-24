import { GithubIcon, GlobeIcon, LinkedinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function LeftNav() {
  return (
    <nav className="relative flex flex-col gap-2 justify-start items-start mt-3 max-w-28">
      <Image
        src="/logo.png"
        alt="IdentityIQ"
        width={100}
        height={100}
        className="place-self-center"
      />
      <h1 className="place-self-center">IdentityIQ</h1>
      <p className="place-self-center p-1 text-xs text-center">
        AI-Powered Next.js 14 Web App with TensorFlow People Detection, Screenshot & Recording
      </p>
      <div className="w-full flex flex-col gap-2 absolute bottom-2">
        <Separator className="my-1" />
        <p className=" p-1 text-xs ">Get in Touch</p>
        <Link
          href="https://www.linkedin.com/in/amanda-natallie/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm" className="flex gap-2">
            <LinkedinIcon size={15} /> LinkedIn
          </Button>
        </Link>
        <Link href="https://www.vallorisolutions.com/" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="flex gap-2">
            <GlobeIcon size={15} /> Website
          </Button>
        </Link>
        <Link
          href="https://github.com/amanda-natallie/identity-iq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm" className="flex gap-2">
            <GithubIcon size={15} /> GitHub
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default LeftNav;
