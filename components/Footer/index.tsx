import GitHubIcon from "@/components/icons/GitHubIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";

interface Props {
    footerText?: string | null;
    linkedIn?: string | null;
    gitHub?: string | null;
}

export default function Footer({ footerText, linkedIn, gitHub }: Props) {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Name + copyright */}
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {footerText}
                    </span>
                </p>

                {/* Social links */}
                <div className="flex items-center gap-4">
                    {linkedIn && (
                        <a
                            href={linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-slate-500 dark:text-slate-400 transition hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            <LinkedInIcon size={20} />
                        </a>
                    )}
                    {gitHub && (
                        <a
                            href={gitHub}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-slate-500 dark:text-slate-400 transition hover:text-slate-900 dark:hover:text-white"
                        >
                            <GitHubIcon size={20} />
                        </a>
                    )}
                </div>
            </div>
        </footer>
    );
}
