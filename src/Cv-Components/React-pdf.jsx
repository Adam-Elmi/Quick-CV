import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    text: {
        color: "red"
    },
    viewer: {
        width: '100%', 
        height: '100vh',
    }
});

const MyDocument = () => (
 <PDFViewer style={styles.viewer}>
         <Document >
        <Page width={100} size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Template 101</Text>
            </View>
            <View style={styles.section}>
                <Text>Adam</Text>
            </View>
        </Page>
    </Document>
 </PDFViewer>
);

export default MyDocument;