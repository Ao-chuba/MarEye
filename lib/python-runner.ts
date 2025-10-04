import path from "path"
import fs from "fs"
import { spawn } from "child_process"

function resolvePythonExecutable(repoRoot: string): string {
  const fromEnv = process.env.PYTHON_EXECUTABLE
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv
  }

  // Prefer project venv on Windows
  if (process.platform === "win32") {
    const venvPy = path.join(repoRoot, ".venv", "Scripts", "python.exe")
    if (fs.existsSync(venvPy)) return venvPy
    // Common fallback names
    return "python"
  }

  // Unix-like: prefer .venv/bin/python if present
  const venvUnix = path.join(repoRoot, ".venv", "bin", "python")
  if (fs.existsSync(venvUnix)) return venvUnix
  return "python3"
}

export async function runPythonCommand(args: string[], cwd: string) {
  const pythonExe = resolvePythonExecutable(cwd)
  return await new Promise<{ stdout: string; stderr: string; code: number }>((resolve) => {
    const child = spawn(pythonExe, args, { cwd, stdio: ["ignore", "pipe", "pipe"] })
    let stdout = ""
    let stderr = ""
    child.stdout.on("data", (d) => (stdout += d.toString()))
    child.stderr.on("data", (d) => (stderr += d.toString()))
    child.on("close", (code) => resolve({ stdout, stderr, code: code ?? 0 }))
  })
}


