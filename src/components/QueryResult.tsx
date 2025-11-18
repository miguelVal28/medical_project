import type {
  QueryResultListSchema,
  QueryResultSchema,
} from "@/lib/types/queryTypes";

import { Button } from "./Button";
import Link from "next/link";

interface QueryResultListProps {
  receivedInfo: QueryResultListSchema;
}

interface QueryResultModernItemProps {
  result: QueryResultSchema;
  index: number;
}

export default function QueryResultList({
  receivedInfo,
}: QueryResultListProps) {
  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-medium text-gray-900 dark:text-white">
        Query Result
      </h1>
      <div className="mt-4 space-y-3">
        {Array.isArray(receivedInfo)
          ? receivedInfo.map((element, index) => (
              <QueryResultModernItem
                key={element.id}
                result={element}
                index={index}
              />
            ))
          : null}
      </div>
    </div>
  );
}

function QueryResultModernItem({ result, index }: QueryResultModernItemProps) {
  // Alternate background colors for even/odd rows
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col sm:flex-row py-3 px-4 ${
        isEven
          ? "bg-gray-50 dark:bg-slate-800/50"
          : "bg-white dark:bg-slate-900"
      } rounded-lg mb-2`}
    >
      <div className="sm:w-1/3 mb-2 sm:mb-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white text-sm font-medium mr-2">
            {index + 1}
          </span>
          {result.first_name} {result.last_name}
        </h3>
      </div>

      <div className="sm:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            EMAIL
          </span>
          <span className="text-sm text-gray-900 dark:text-gray-100">
            {result.email}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            DOCUMENT
          </span>
          <span className="text-sm text-gray-900 dark:text-gray-100">
            {result.document}
          </span>
        </div>
      </div>
      <Link href={`/patients/profile/?userId=${result.id}`}>
        <Button type="button" variant="primary" className="ml-4">
          View Patient
        </Button>
      </Link>
    </div>
  );
}
