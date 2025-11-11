interface HeaderCardProps {
  mainTitle: string;
  subTitle: string;
}

export default function HeaderCard({ mainTitle, subTitle }: HeaderCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg col-span-full">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          {mainTitle}
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {subTitle}
        </p>
      </div>
    </div>
  );
}
