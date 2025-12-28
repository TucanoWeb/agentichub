import React from "react";
import { createPortal } from "react-dom";
import type { FileStructureItem, AIContext } from "../api/repos";

interface FileStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileStructure?: FileStructureItem[];
  aiContext?: AIContext;
  repoName?: string;
}

const FileStructureModal: React.FC<FileStructureModalProps> = ({
  isOpen,
  onClose,
  fileStructure,
  aiContext,
  repoName,
}) => {
  if (!isOpen) return null;

  const renderFileItem = (item: FileStructureItem, depth = 0) => {
    const indent = depth * 16;
    const isDir = item.type === "dir";
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.path}>
        <div
          className="flex items-center py-1 px-2 hover:bg-slate-100 rounded text-sm"
          style={{ marginLeft: `${indent}px` }}
        >
          <span className="mr-2 text-slate-500">{isDir ? (hasChildren ? "📂" : "📁") : "📄"}</span>
          <span className={isDir ? "font-medium text-slate-700" : "text-slate-600"}>
            {item.name}
          </span>
          {!isDir && item.size && (
            <span className="ml-auto text-xs text-slate-400">{formatFileSize(item.size)}</span>
          )}
        </div>
        {hasChildren && (
          <div>{item.children!.map((child) => renderFileItem(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2F58CD] to-[#36E2B2] p-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">📁 Estrutura do Projeto: {repoName}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-slate-200 text-2xl leading-none font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-12rem)]">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* AI Context Summary */}
            {aiContext && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
                  🤖 Resumo para IA
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Linguagem Principal:</p>
                    <p className="text-slate-800">{aiContext.primary_language}</p>
                  </div>

                  {aiContext.estimated_stack.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-slate-600">Stack Detectado:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {aiContext.estimated_stack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-slate-600">Arquivos Principais:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {aiContext.main_files.map((file, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                        >
                          {file}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-slate-600 mb-2">
                      Insights Arquiteturais:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div
                        className={
                          aiContext.architecture_insights.has_src_folder
                            ? "text-green-600"
                            : "text-slate-400"
                        }
                      >
                        {aiContext.architecture_insights.has_src_folder ? "✓" : "○"} Pasta src/
                      </div>
                      <div
                        className={
                          aiContext.architecture_insights.has_components
                            ? "text-green-600"
                            : "text-slate-400"
                        }
                      >
                        {aiContext.architecture_insights.has_components ? "✓" : "○"} Componentes
                      </div>
                      <div
                        className={
                          aiContext.architecture_insights.has_api_routes
                            ? "text-green-600"
                            : "text-slate-400"
                        }
                      >
                        {aiContext.architecture_insights.has_api_routes ? "✓" : "○"} API/Routes
                      </div>
                      <div
                        className={
                          aiContext.architecture_insights.has_tests
                            ? "text-green-600"
                            : "text-slate-400"
                        }
                      >
                        {aiContext.architecture_insights.has_tests ? "✓" : "○"} Testes
                      </div>
                    </div>
                  </div>

                  {aiContext.architecture_insights.explored_directories.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-slate-600">Diretórios Explorados:</p>
                      <div className="space-y-1 mt-1">
                        {aiContext.architecture_insights.explored_directories.map((dir, idx) => (
                          <div key={idx} className="text-xs bg-slate-100 rounded p-2">
                            <span className="font-medium">{dir.name}/</span>
                            <span className="text-slate-500 ml-2">({dir.file_count} arquivos)</span>
                            {dir.main_files.length > 0 && (
                              <div className="mt-1">
                                <span className="text-slate-600">
                                  {dir.main_files.slice(0, 3).join(", ")}
                                </span>
                                {dir.main_files.length > 3 && (
                                  <span className="text-slate-400">...</span>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* File Structure Tree */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
                🗂️ Estrutura de Arquivos
              </h3>

              {fileStructure && fileStructure.length > 0 ? (
                <div className="bg-slate-50 rounded-lg p-3 max-h-96 overflow-y-auto">
                  <div className="space-y-1">
                    {fileStructure.map((item) => renderFileItem(item))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <div className="animate-spin mx-auto mb-4 h-6 w-6 border-4 border-slate-400 border-t-transparent rounded-full"></div>
                  <p>Carregando Estrutura de Arquivos</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default FileStructureModal;
