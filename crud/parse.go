package crud

import (
	"bufio"
	"bytes"
	"os"

	log "github.com/Sirupsen/logrus"
)

func parseFile(dir, fileName string, leadingSpaces int, embed bool) []byte {
	f, err := os.Open(dir + "/" + fileName)
	if err != nil {
		log.Error("Could not import schema: ", err)
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	parsedFile := []byte{}

	// check if the file is an embed
	scanner.Scan()
	firstLine := scanner.Bytes()
	if bytes.Contains(firstLine, []byte("embed_me")) && !embed {
		return []byte{}
	}

	// read each line
	for scanner.Scan() {

		// parse out all the variables into a new array
		parsedLine := scanner.Bytes()
		va := [][]byte{}
		parsedVa := [][]byte{}

		// first, replace any tabs with spaces, because YAML does NOT like tabs
		parsedLine = bytes.Replace(parsedLine, []byte{9}, []byte(" "), -1)
		for _, v := range bytes.Split(parsedLine, []byte("{{")) {
			if bytes.Contains(v, []byte("}}")) {
				va = append(va, bytes.Split(v, []byte("}}"))[0])
			}
		}

		// normalize the variables by removing all whitespace
		for _, v := range va {
			parsedVa = append(parsedVa, bytes.Replace(v, []byte(" "), []byte{}, -1))
		}

		// replace the original variable with the normalized one
		for k, v := range va {
			parsedLine = bytes.Replace(parsedLine, v, parsedVa[k], 1)
		}

		parsedLine = parseEmbeddedFile(dir, parsedLine, leadingSpaces)
		parsedLine = parseBuiltInFuncs(parsedLine)

		// add back any leading spaces and carriage returns
		parsedLine = append(bytes.Repeat([]byte{32}, leadingSpaces), parsedLine...)
		parsedLine = append(parsedLine, byte(10))
		parsedFile = append(parsedFile, parsedLine...)
	}

	// TODO: check all the things to make sure everything is copacetic
	return parsedFile
}

func parseEmbeddedFile(dir string, line []byte, leadingSpaces int) []byte {
	embed := []byte("{{embed(")
	if bytes.Contains(line, embed) {
		leadingSpaces := countLeadingSpace(line) + leadingSpaces
		embeddedFileName := string(
			bytes.Split(
				bytes.Replace(
					bytes.TrimSpace(line), embed, []byte{}, -1,
				), []byte(")"),
			)[0],
		)

		return parseFile(dir, embeddedFileName, leadingSpaces, true)
	}

	return line
}

func parseBuiltInFuncs(line []byte) []byte {
	if bytes.Contains(line, []byte("(")) {
		line = bytes.Replace(line, []byte("("), []byte(" "), -1)
		line = bytes.Replace(line, []byte(")"), []byte{}, -1)
		return bytes.Replace(line, []byte(" }}"), []byte("}}"), -1)
	}

	return line
}

func countLeadingSpace(line []byte) int {
	i := 0
	for _, value := range line {
		if value == 32 {
			i++
		} else {
			break
		}
	}
	return i
}
