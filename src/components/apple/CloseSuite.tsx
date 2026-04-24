import { BigClose } from "./BigClose";
import { BlogAndNewsletterFun } from "./BlogAndNewsletterFun";

interface CloseSuiteProps {
  prefix: string;
  closeHeadline?: string;
  closeTagline?: string;
}

/** Site-wide closing pattern: big black ready-to-book close, then a fun
 *  envelope-driven newsletter section that also houses the blog CTA. */
export function CloseSuite({
  prefix,
  closeHeadline,
  closeTagline,
}: CloseSuiteProps) {
  return (
    <>
      <BigClose
        href={`${prefix}/contact`}
        headline={closeHeadline}
        tagline={closeTagline}
      />
      <BlogAndNewsletterFun prefix={prefix} />
    </>
  );
}
