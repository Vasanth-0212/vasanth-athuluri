export default function LinkedInIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452H17.01v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.588V9h3.308v1.561h.046c.461-.873 1.588-1.794 3.268-1.794 3.496 0 4.141 2.302 4.141 5.297v6.388zM5.337 7.433a1.924 1.924 0 1 1 0-3.849 1.924 1.924 0 0 1 0 3.849zM6.969 20.452H3.7V9h3.269v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
