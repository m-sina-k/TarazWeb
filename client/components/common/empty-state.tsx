import Image from "next/image";

export function EmptyState() {
  return (
    <div className="flex items-center justify-center h-[400px] flex-col">
      <div className="w-[100px] h-[100px] bg-accent rounded-full flex items-center justify-center p-4">
        <Image
          src="/images/empty.png"
          alt="Empty State"
          width={75}
          height={75}
        />
      </div>
      <div className="text-muted-foreground text-center mt-4">
        داده ای برای نمایش وجود ندارد
      </div>
    </div>
  );
}
